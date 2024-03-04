import { ModeToggle } from "@/components/ui/dark-mode-toggle";
import SignUp from "./pages/signup";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center">
            <section>
                <ModeToggle />
            </section>
            <section>
                <SignUp />
            </section>
       </main>
    );
}
