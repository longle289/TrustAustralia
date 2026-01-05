import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { DiscretionaryTrustPDF } from '@/lib/pdf/discretionary-trust';
import { UnitTrustPDF } from '@/lib/pdf/unit-trust';
import {
  discretionaryTrustSchema,
  unitTrustSchema,
  type DiscretionaryTrustForm,
  type UnitTrustForm,
} from '@/lib/schemas/trust';
import React from 'react';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, formData, sessionId } = body;

    // Validate trust type
    if (type !== 'discretionary' && type !== 'unit') {
      return NextResponse.json(
        { error: 'Invalid trust type' },
        { status: 400 }
      );
    }

    // Validate form data
    let validatedData: DiscretionaryTrustForm | UnitTrustForm;

    if (type === 'discretionary') {
      const result = discretionaryTrustSchema.safeParse(formData);
      if (!result.success) {
        return NextResponse.json(
          { error: 'Invalid form data', details: result.error.issues },
          { status: 400 }
        );
      }
      validatedData = result.data;
    } else {
      const result = unitTrustSchema.safeParse(formData);
      if (!result.success) {
        return NextResponse.json(
          { error: 'Invalid form data', details: result.error.issues },
          { status: 400 }
        );
      }
      validatedData = result.data;
    }

    // Generate PDF
    let pdfBuffer: Buffer;

    if (type === 'discretionary') {
      const pdfDocument = React.createElement(DiscretionaryTrustPDF, {
        data: validatedData as DiscretionaryTrustForm,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(pdfDocument as any);
    } else {
      const pdfDocument = React.createElement(UnitTrustPDF, {
        data: validatedData as UnitTrustForm,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(pdfDocument as any);
    }

    // Return PDF as response
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${validatedData.trustDetails.trustName.replace(/[^a-zA-Z0-9]/g, '_')}_Trust_Deed.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
