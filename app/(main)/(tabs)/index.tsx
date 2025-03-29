import Loading from "@/components/custom/Loading";
import CampLeaderLayout from "@/components/layouts/home/CampLeaderLayout";
import GroupLeaderLayout from "@/components/layouts/home/GroupLeaderLayout";
import ParentLayout from "@/components/layouts/home/ParentLayout";
import UserLayout from "@/components/layouts/home/UserLayout";
import { useAuth } from "@/hooks/useAuth";
import { UserRoles } from "@/types/enums/roles";
import { useMemo } from "react";

const Home = () => {
  const { user } = useAuth()

  const activeLayout = useMemo(() => {
    switch (user?.role) {
      case UserRoles.CAMP_LEADER:
        return <CampLeaderLayout />;
      case UserRoles.GROUP_LEADER:
        return <GroupLeaderLayout />;
      case UserRoles.PARENT:
        return <ParentLayout />;
      case UserRoles.USER:
        return <UserLayout />;
      default:
        return <Loading showText={true} />;
    }
  }, [user])

  return activeLayout;
}

export default Home