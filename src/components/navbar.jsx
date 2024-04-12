import Image from "next/image";
import Link from "next/link"

export function Navbar() {
  return (
    <header className="flex h-24 w-full items-center px-4 md:px-6">
      <div className="flex items-center gap-2">
        <div style={{ width: '120px', height: '60px', position: 'relative' }}>
          <Image
                src="/sabanci.png" // Update the path if your image is in the public folder
                alt="Sabancı University Logo"
                layout="fill"
                objectFit="contain"
              />
          </div>
        <Link className="hidden lg:flex items-center gap-2" href="#">
        
          <span className="font-semibold">AssistantSU</span>
        </Link>
      </div>
      <nav className="ml-auto flex items-center gap-4">
        <Link className="font-semibold underline" href="#">
          Upload Course Documents
        </Link>
        <Link className="font-semibold underline" href="#">
          Logout
        </Link>
      </nav>
    </header>
  );
}

