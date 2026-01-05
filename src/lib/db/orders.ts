import { prisma } from './index';
import { ProductType, OrderStatus, Prisma } from '@prisma/client';

export function mapProductType(type: string): ProductType {
  const mapping: Record<string, ProductType> = {
    discretionary: ProductType.DISCRETIONARY,
    unit: ProductType.UNIT,
    'discretionary-bundle': ProductType.DISCRETIONARY_BUNDLE,
    'company-registration': ProductType.COMPANY_REGISTRATION,
    'smsf-bundle': ProductType.SMSF_BUNDLE,
  };
  return mapping[type] || ProductType.DISCRETIONARY;
}

export async function createOrder(data: {
  userId?: string | null;
  email?: string;
  productType: string;
  productName: string;
  amount: number;
  formData: Record<string, unknown>;
}) {
  return prisma.order.create({
    data: {
      userId: data.userId || null,
      email: data.email || '',
      productType: mapProductType(data.productType),
      productName: data.productName,
      amount: data.amount,
      formData: data.formData as Prisma.InputJsonValue,
      status: OrderStatus.PENDING,
    },
  });
}

export async function updateOrderWithStripeSession(
  orderId: string,
  stripeSessionId: string
) {
  return prisma.order.update({
    where: { id: orderId },
    data: { stripeSessionId },
  });
}

export async function completeOrder(
  stripeSessionId: string,
  data: {
    email?: string;
    stripePaymentId?: string;
  }
) {
  return prisma.order.update({
    where: { stripeSessionId },
    data: {
      status: OrderStatus.COMPLETED,
      email: data.email || undefined,
      stripePaymentId: data.stripePaymentId || undefined,
    },
  });
}

export async function failOrder(stripeSessionId: string) {
  return prisma.order.update({
    where: { stripeSessionId },
    data: { status: OrderStatus.FAILED },
  });
}

export async function getOrderByStripeSession(stripeSessionId: string) {
  return prisma.order.findUnique({
    where: { stripeSessionId },
  });
}

export async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      productType: true,
      productName: true,
      amount: true,
      status: true,
      createdAt: true,
      pdfGenerated: true,
    },
  });
}

export async function getOrderById(orderId: string, userId: string) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      userId: userId,
    },
  });
}

export async function getOrderByIdWithoutUser(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
  });
}

export async function linkGuestOrdersToUser(email: string, userId: string) {
  return prisma.order.updateMany({
    where: {
      email: email,
      userId: null,
    },
    data: {
      userId: userId,
    },
  });
}

export async function linkOrderToUser(orderId: string, userId: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { userId },
  });
}
