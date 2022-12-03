import { ConfigProvider, theme } from "antd";
import { PropsWithChildren } from "react";

export const ThemeProvider = (props: PropsWithChildren<unknown>) => {
    return <ConfigProvider
        
        // theme={{
        //     token: {
        //         colorPrimary: '#3500D3',
        //         colorError: '#0C0032'
        //     },
        //     algorithm: theme.darkAlgorithm
        // }}
    >
        {props.children}
    </ConfigProvider>;
};