import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // In a real app with Stripe, you would do this:
    /*
    import Stripe from "stripe";
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map(item => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // in paise
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/demo/urbanwood/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/demo/urbanwood/cart`,
    });
    return NextResponse.json({ url: session.url });
    */

    // For this demo, we simulate a successful API call and return a mock success URL
    const mockSuccessUrl = "/demo/urbanwood/success";
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ url: mockSuccessUrl });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
