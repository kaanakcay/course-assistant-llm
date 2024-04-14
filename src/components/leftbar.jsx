import { Button } from "@/components/ui/button";
import { useState } from 'react'; // Import useState

export function Leftbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  // Function to toggle the dropdown open and closed
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div key="1" className="flex flex-col items-center w-72 rounded-xl border border-gray-200 shadow-lg dark:border-gray-200 mt-4 ml-5 min-h-[80vh]">
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
      <div className="w-full border-t border-gray-200 dark:border-your-dark-mode-color">
        <br />
        <div className="w-full p-4 flex justify-center">
          <h2 className="text-lg font-semibold leading-none text-center">Course Selection</h2> {/* Centered text */}
        </div>
        {/* Dropdown Button */}
        <div className="flex justify-center items-center w-full">
          <Button
            className="w-3/4 text-center py-2 dark:bg-gray-600 dark:text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75"
            onClick={toggleDropdown}
          >
            Select Course
          </Button>
        </div>
        {/* Dropdown Content */}
        {isDropdownOpen && (
          <div className="flex flex-col items-center w-full">
            <Button className="">Course 1</Button>
            <Button className="">Course 2</Button>
            <Button className="w-full justify-start pl-4 text-left">Course 3</Button>
            <Button className="w-full justify-start pl-4 text-left">Course 4</Button>
          </div>
        )}
      </div>
      
    </div>
  );
}
