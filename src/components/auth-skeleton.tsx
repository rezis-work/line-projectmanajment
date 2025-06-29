export function AuthSkeleton() {
  return (
    <div className="w-full h-full md:w-[487px] border-none shadow-none">
      <div className="flex items-center justify-center text-center p-7">
        <div className="h-8 w-48 bg-gray-200 rounded-md" />
      </div>
      <div className="px-7">
        <div className="h-px w-full bg-gray-200" />
      </div>
      <div className="p-7 space-y-4">
        <div className="h-10 w-full bg-gray-200 rounded-md" />
        <div className="h-10 w-full bg-gray-200 rounded-md" />
        <div className="h-10 w-full bg-gray-200 rounded-md" />
      </div>
      <div className="px-7">
        <div className="h-px w-full bg-gray-200" />
      </div>
      <div className="p-7 flex flex-col gap-y-4">
        <div className="h-10 w-full bg-gray-200 rounded-md" />
        <div className="h-10 w-full bg-gray-200 rounded-md" />
      </div>
      <div className="px-7">
        <div className="h-px w-full bg-gray-200" />
      </div>
      <div className="p-7 flex items-center justify-center">
        <div className="h-5 w-64 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}
