"use client";
import { useRouter } from "next/navigation";
import authApiRequest from "src/app/api/auth/requests";
import { Button } from "src/components/ui/button";
import { handleErrorApi } from "src/lib/utils";

const ButtonLogout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutClient().then(() => {
        router.push("/login");
      });
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return (
    <Button size="sm" onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
};

export default ButtonLogout;
