import {
    Card,
    Page,
    Layout,
    TextContainer,
    Stack,
    Heading
} from "@shopify/polaris";

export default function Help() {
    return (
        <Page fullWidth>
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <Stack
                            wrap={false}
                            spacing="extraTight"
                            distribution="trailing"
                            alignment="center"
                        >
                            <Stack.Item fill>
                                <TextContainer spacing="loose">
                                    <Heading>Need help?</Heading>
                                    <p>
                                        For more help contact us on our website.
                                    </p>
                                </TextContainer>
                            </Stack.Item>
                        </Stack>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
