export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Payment Cancelled</h1>
        <p className="text-gray-700 text-lg">
          Your checkout was cancelled. No charges have been made.
        </p>

        <a
          href="/"
          className="mt-6 inline-block text-red-600 hover:underline text-sm"
        >
          ← Go back to home
        </a>
      </div>
    </div>
  );
}
