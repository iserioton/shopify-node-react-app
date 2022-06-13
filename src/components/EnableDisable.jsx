import {
    Spinner,
    SettingToggle,
    TextStyle
} from "@shopify/polaris";
import { useAppBridge, useToast } from '@shopify/app-bridge-react';
import { useEffect, useState } from "react";
import { userLoggedInFetch } from "../App";

function EnableDisable() {
    const { show } = useToast();
    const [btnStatus, setBtnStatus] = useState();
    const [spin, setSpin] = useState(1);
    const app = useAppBridge();
    const fetch = userLoggedInFetch(app);

    async function getSettings() {
        const { status, data } = await fetch("/get-settings").then((res) => res.json());
        if (status === 200) {
            setBtnStatus(Number(data.app_status));
        } else {
            setBtnStatus(0);
        }
        setSpin(0);
    }

    useEffect(() => {
        getSettings();
    }, []);

    async function clickHandler() {
        setSpin(1);
        let temp_status = btnStatus ^ 1;
        const { status } = await fetch('/update-settings', {
            method: "POST",
            body: JSON.stringify({
                app_status: temp_status
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => res.json());
        if (status === 200) {
            setBtnStatus(temp_status);
            show('Success! 🎉', { duration: 2000 })
        } else {
            show('Internal server error. Please try again!', { duration: 2000 })
        }
        setSpin(0);
    }

    const textStatus = btnStatus ? 'Enable' : 'Disable';
    const contentStatus = spin ? <Spinner accessibilityLabel="Spinner enableDisable" size="small" /> : btnStatus ? 'Deactivate' : 'Activate';

    return (
        <SettingToggle
            action={{
                content: contentStatus,
                onAction: clickHandler,
            }}
            enabled={btnStatus}
        >
            This setting is <TextStyle variation="strong">{textStatus}</TextStyle>.
        </SettingToggle>
    );
}

export default EnableDisable;