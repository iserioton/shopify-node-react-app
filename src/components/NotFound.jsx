import {
    Card,
    Page,
    Layout,
    TextContainer,
    Stack,
    Heading
} from "@shopify/polaris";

export default function NotFound() {
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
                                    <Heading>404</Heading>
                                    <p>
                                        You are looking for page in unavailable.
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
