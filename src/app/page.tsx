import { ModeToggle } from '../components/ModeToggle'

export default function Home() {
  return (
    <div className="flex flex-row justify-between items-center">
      <h1 className="dark:text-white">
        Hello Messenger!
      </h1>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}

