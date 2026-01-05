import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { UnitTrustForm } from '@/lib/schemas/trust';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    textDecoration: 'underline',
  },
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
  },
  clause: {
    marginBottom: 15,
  },
  clauseNumber: {
    fontWeight: 'bold',
  },
  subClause: {
    marginLeft: 20,
    marginBottom: 5,
  },
  table: {
    marginTop: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5,
  },
  tableCellLabel: {
    fontWeight: 'bold',
    width: 150,
  },
  signatureBlock: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 20,
  },
  signatureLine: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: 250,
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 10,
    color: '#666',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 9,
    color: '#666',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 50,
    fontSize: 10,
    color: '#666',
  },
});

interface UnitTrustPDFProps {
  data: UnitTrustForm;
}

export function UnitTrustPDF({ data }: UnitTrustPDFProps) {
  const { trustDetails, settlor, trustee, unitHolders, appointer } = data;

  const formatAddress = (address: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
  }) => {
    return `${address.street}, ${address.suburb} ${address.state} ${address.postcode}`;
  };

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Unit Trust Deed</Text>
          <Text style={styles.subtitle}>{trustDetails.trustName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trust Details</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Trust Name:</Text>
              <Text style={styles.tableCell}>{trustDetails.trustName}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Date of Establishment:</Text>
              <Text style={styles.tableCell}>
                {trustDetails.establishmentDate}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>State of Establishment:</Text>
              <Text style={styles.tableCell}>{trustDetails.state}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Total Units on Issue:</Text>
              <Text style={styles.tableCell}>{unitHolders.totalUnits}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settlor</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Name:</Text>
              <Text style={styles.tableCell}>
                {settlor.firstName} {settlor.lastName}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Address:</Text>
              <Text style={styles.tableCell}>
                {formatAddress(settlor.address)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Settlement Sum:</Text>
              <Text style={styles.tableCell}>${settlor.settlementSum}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trustee</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Type:</Text>
              <Text style={styles.tableCell}>
                {trustee.type === 'individual' ? 'Individual' : 'Company'}
              </Text>
            </View>
            {trustee.type === 'individual' ? (
              <>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Name:</Text>
                  <Text style={styles.tableCell}>
                    {trustee.individual.firstName} {trustee.individual.lastName}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Address:</Text>
                  <Text style={styles.tableCell}>
                    {formatAddress(trustee.individual.address)}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Company Name:</Text>
                  <Text style={styles.tableCell}>{trustee.company.name}</Text>
                </View>
                {trustee.company.acn && (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCellLabel}>ACN:</Text>
                    <Text style={styles.tableCell}>{trustee.company.acn}</Text>
                  </View>
                )}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Address:</Text>
                  <Text style={styles.tableCell}>
                    {formatAddress(trustee.company.address)}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Unit Holders</Text>
          {unitHolders.holders.map((holder, index) => (
            <View key={index} style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>
                  Unit Holder {index + 1}:
                </Text>
                <Text style={styles.tableCell}>
                  {holder.holder.type === 'individual'
                    ? `${holder.holder.individual.firstName} ${holder.holder.individual.lastName}`
                    : holder.holder.company.name}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>Units Held:</Text>
                <Text style={styles.tableCell}>
                  {holder.units} ({((holder.units / unitHolders.totalUnits) * 100).toFixed(2)}%)
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointer</Text>
          <View style={styles.table}>
            {appointer.type === 'individual' ? (
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>Name:</Text>
                <Text style={styles.tableCell}>
                  {appointer.individual.firstName}{' '}
                  {appointer.individual.lastName}
                </Text>
              </View>
            ) : (
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>Company Name:</Text>
                <Text style={styles.tableCell}>{appointer.company.name}</Text>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.footer}>
          Trust Australia - Professional Trust Deed Services
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>

      {/* Terms and Conditions Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>UNIT TRUST DEED</Text>

        <View style={styles.paragraph}>
          <Text>
            THIS DEED is made on {trustDetails.establishmentDate} in the State
            of {trustDetails.state}, Australia.
          </Text>
        </View>

        <View style={styles.clause}>
          <Text style={styles.clauseNumber}>1. DEFINITIONS</Text>
          <View style={styles.subClause}>
            <Text>
              In this Deed, unless the context otherwise requires:
            </Text>
            <Text>
              &quot;Unit&quot; means an undivided share in the Trust Fund.
            </Text>
            <Text>
              &quot;Unit Holder&quot; means a person registered as the holder of
              a Unit.
            </Text>
            <Text>
              &quot;Trust Fund&quot; means all property held by the Trustee on
              the trusts of this Deed.
            </Text>
            <Text>
              &quot;Vesting Day&quot; means the day falling 80 years after the
              date of this Deed.
            </Text>
          </View>
        </View>

        <View style={styles.clause}>
          <Text style={styles.clauseNumber}>2. ESTABLISHMENT OF TRUST</Text>
          <View style={styles.subClause}>
            <Text>
              2.1 The Settlor settles on the Trustee the Settlement Sum to hold
              on the trusts declared in this Deed.
            </Text>
            <Text>
              2.2 The Trustee declares that it holds the Trust Fund on the
              trusts and with the powers set out in this Deed.
            </Text>
            <Text>
              2.3 The Trust Fund is divided into {unitHolders.totalUnits} Units.
            </Text>
          </View>
        </View>

        <View style={styles.clause}>
          <Text style={styles.clauseNumber}>3. UNIT ENTITLEMENTS</Text>
          <View style={styles.subClause}>
            <Text>
              3.1 Each Unit confers an equal interest in the Trust Fund.
            </Text>
            <Text>
              3.2 Each Unit Holder is entitled to a proportionate share of the
              income and capital of the Trust Fund based on the number of Units
              held.
            </Text>
            <Text>
              3.3 Units may be transferred with the consent of the Trustee.
            </Text>
          </View>
        </View>

        <View style={styles.clause}>
          <Text style={styles.clauseNumber}>
            4. INCOME DISTRIBUTIONS
          </Text>
          <View style={styles.subClause}>
            <Text>
              4.1 The Trustee must distribute the net income of the Trust Fund
              to Unit Holders in proportion to their Units.
            </Text>
            <Text>
              4.2 Distributions are made as at 30 June each year.
            </Text>
          </View>
        </View>

        <View style={styles.clause}>
          <Text style={styles.clauseNumber}>5. TRUSTEE POWERS</Text>
          <View style={styles.subClause}>
            <Text>
              5.1 The Trustee has all powers necessary for the administration of
              the Trust Fund.
            </Text>
            <Text>
              5.2 The Trustee may invest, sell, mortgage, or otherwise deal with
              Trust Fund assets.
            </Text>
            <Text>
              5.3 The Trustee may issue additional Units.
            </Text>
            <Text>
              5.4 The Trustee may redeem Units.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Trust Australia - Professional Trust Deed Services
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>

      {/* Signature Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>EXECUTION</Text>

        <View style={styles.paragraph}>
          <Text>
            EXECUTED as a Deed on the date first written above.
          </Text>
        </View>

        <View style={styles.signatureBlock}>
          <Text style={styles.clauseNumber}>SETTLOR</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureLabel}>Signature</Text>
          <Text>
            Name: {settlor.firstName} {settlor.lastName}
          </Text>
        </View>

        <View style={styles.signatureBlock}>
          <Text style={styles.clauseNumber}>TRUSTEE</Text>
          {trustee.type === 'individual' ? (
            <>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Signature</Text>
              <Text>
                Name: {trustee.individual.firstName}{' '}
                {trustee.individual.lastName}
              </Text>
            </>
          ) : (
            <>
              <Text>
                Executed by {trustee.company.name}
                {trustee.company.acn ? ` ACN ${trustee.company.acn}` : ''}:
              </Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <View>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureLabel}>Director Signature</Text>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureLabel}>Director Name</Text>
                </View>
                <View>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureLabel}>
                    Director/Secretary Signature
                  </Text>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureLabel}>
                    Director/Secretary Name
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        <View style={styles.signatureBlock}>
          <Text style={styles.clauseNumber}>UNIT HOLDERS</Text>
          {unitHolders.holders.map((holder, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text>
                {holder.holder.type === 'individual'
                  ? `${holder.holder.individual.firstName} ${holder.holder.individual.lastName}`
                  : holder.holder.company.name}{' '}
                ({holder.units} Units)
              </Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Signature</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Trust Australia - Professional Trust Deed Services
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
