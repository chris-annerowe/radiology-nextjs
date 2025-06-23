import { db } from '@/lib/db'
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    console.log("POST method")
    const body = await req.json();
    const { 
      total, 
      insurance, 
      tax, 
      amtPaid, 
      balance,
      patient_first_name,
      patient_last_name,
      patient_id,
      numOfStudies,
      paidBy,
      paymentType,
      clientProvider,
      insuranceProvider,
      order_id
     } = body;
    try {
      const transaction = await db.pos_transactions.create({
        data: {
          totalBillable: total,
          insuranceAmt: insurance,
          order_id: order_id,
          taxPaid: tax,
          amountPaid: amtPaid,
          outstanding_balance:balance,
          numOfStudies,
          patient_first_name,
          patient_last_name,
          patient_id,
          paidBy,
          paymentType,
          clientProvider,
          insuranceProvider
        },
      });
      return NextResponse.json({ transaction: transaction, message: 'Transaction saved successfully'}, {status: 201})
    } catch (error) {
      return NextResponse.json({ transaction: null, message: 'Transaction failed to send'}, {status: 500})
    }
  } else {
    return NextResponse.json({ transaction: null, message: 'Method not allowed'}, {status: 405})
  }
}

export async function GET() {
  try {
    // get transactions for the previous month, 1st to 1st of current month
    const previousMonthStart = startOfMonth(subMonths(new Date(), 1));
    const previousMonthEnd = endOfMonth(subMonths(new Date(), 1));

    const transactions = await db.pos_transactions.findMany({
    //   where: {
    //     timestamp: {
    //       gte: previousMonthStart,
    //       lte: previousMonthEnd,
    //     },
    //   },
    });

    return NextResponse.json({ transactions: transactions, message: 'Transactions retrieved successfully' ,status:200});
  } catch (error) {
    console.error('Error executing query', error);
    return NextResponse.json({ error: 'Internal Server Error' ,status:500});
  }
}