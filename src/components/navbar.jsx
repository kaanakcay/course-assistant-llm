import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="flex h-24 w-full items-center px-4 md:px-6 border bg-gray-100"> {/* Added bottom border with gray-200 color */}
      <div className="flex items-center gap-4">
        <div style={{ width: '120px', height: '60px', position: 'relative' }}>
          <Image
            src="/sabanci.png" // Make sure the path is correct
            alt="Sabancı University Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <Link href="#" className="hidden lg:flex items-center gap-2 text-4x1 font-semibold" style={{ fontSize: '26px', fontWeight: 'bold' }}>
          <span className="font-semibold">AssistantSU</span>
        </Link>
      </div>
      <nav className="ml-auto flex items-center gap-4">
        <Link href="#" className="font-semibold underline">
          Upload Course Documents
        </Link>
        <Link href="#" className="font-semibold underline">
          Logout
        </Link>
      </nav>
    </header>
  );
}
