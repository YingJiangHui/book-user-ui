import {request} from "@@/exports";

export const getSystemSettingsMap = async () => {
    return request<API.Common.Result<API.SystemSetting.Map>>(
        `/api/system-settings/map`,
    );
};
