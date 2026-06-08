import { Link } from "wouter";
import { ArrowRight, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InstallerCTA() {
  return (
    <section className="py-16 lg:py-20 bg-bone">
      <div className="max-w-site mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-forest text-bone flex items-center justify-center shrink-0">
            <HardHat className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-2">Trade Network</div>
            <h3 className="font-serif text-2xl md:text-3xl text-forest leading-tight">
              Are you a Canadian sign installer?{" "}
              <span className="italic text-sage">Join our directory.</span>
            </h3>
            <p className="mt-2 text-stone-600 max-w-2xl">
              CWS works with a trusted network of professional sign installers across Canada. Join our directory to receive referrals from CWS clients in your service area — free to list, no contracts.
            </p>
          </div>
          <Link to="/installer-sign-up" className="md:ml-auto">
            <Button className="bg-forest hover:bg-forest-dark text-bone rounded-full px-7">
              Sign up <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
