import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div>
        <h1>Landing Page (not protected)</h1>
        <Link href='/sign-in'>
            <Button>
                Login
            </Button>
        </Link>
        <Link href='/sign-uo'>
            <Button>
                Register
            </Button>
        </Link>
        </div>
    );
};

export default LandingPage;