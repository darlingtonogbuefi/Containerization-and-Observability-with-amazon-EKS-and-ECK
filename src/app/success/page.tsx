export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4 text-green-600">Payment Successful</h1>
        <p className="text-gray-700 text-lg">
          Thank you for subscribing. Your payment was successful!
        </p>

        <a
          href="/dashboard"
          className="mt-6 inline-block text-green-600 hover:underline text-sm"
        >
          → Go to dashboard
        </a>
      </div>
    </div>
  );
}
