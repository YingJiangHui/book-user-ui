import {
  matchRoutes,
  useAppData,
  useLocation,
  useModel,
  useNavigate,
} from "@@/exports";
import { useEffect } from "react";

export const usePageTitle = () => {
  const name = useModel("@@initialState", (model) => {
    return model.initialState?.name;
  });
  const appData = useAppData();
  const { clientRoutes } = appData;
  const l = useLocation();
  const matches = matchRoutes(clientRoutes, l.pathname);
  // @ts-ignore
  const pageTitle = matches?.[matches?.length - 1]?.route?.name as
    | string
    | undefined;
  useEffect(() => {
    window.document.title = `${pageTitle} - ${name}`;
  }, [name, pageTitle]);
  return [pageTitle, name];
};
