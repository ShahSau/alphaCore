import Navbar from "@/components/common/navbar";
import Sidebar from "@/components/common/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="h-full relative">
      <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      <main>
        <div className="h-full">
          <Navbar />
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
