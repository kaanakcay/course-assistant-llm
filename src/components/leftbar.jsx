import { Button } from "@/components/ui/button";

export function Leftbar() {
  return (
    <div key="1" className="h-screen flex flex-col items-center w-72 rounded-xl border border-gray-200 shadow-lg dark:border-gray-800 m-4">
      <div className="w-full flex flex-col items-center">
        <div className="w-full p-4 flex justify-center">
          <h2 className="text-lg font-semibold leading-none text-center">Conversation History</h2> {/* Centered text */}
        </div>
        <div className="flex-1 w-full flex flex-col items-center gap-2 p-4 overflow-y-auto">
          {/* Use margin auto to center align the items */}
          <div className="flex flex-col w-full max-w-[75%] items-center">
            <div className="w-full rounded-lg bg-gray-100 p-4 text-sm break-words text-center">
              <p>Conversation History 1</p>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-[75%] items-center">
            <div className="w-full rounded-lg bg-gray-100 p-4 text-sm break-words text-center">
              <p>Conversation History 2</p>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-[75%] items-center">
            <div className="w-full rounded-lg bg-gray-100 p-4 text-sm break-words text-center">
              <p>Conversation History 3</p>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-[75%] items-center">
            <div className="w-full rounded-lg bg-gray-100 p-4 text-sm break-words text-center">
              <p>Conversation History 4</p>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-[75%] items-center">
            <div className="w-full rounded-lg bg-gray-100 p-4 text-sm break-words text-center">
              <p>Conversation History 5</p>
            </div>
          </div>
          
        </div>
      </div>
      <br />
      <div className="w-full border-t border-gray-800 dark:border-your-dark-mode-color">
        <div className="w-full p-4 flex justify-center">
          <h2 className="text-lg font-semibold leading-none text-center">Course Selection</h2> {/* Centered text */}
        </div>
      </div>
    </div>
  );
}
