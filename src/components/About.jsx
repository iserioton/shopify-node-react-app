import {
    Card,
    Page,
    Layout,
    TextContainer,
    Stack,
    Heading
} from "@shopify/polaris";

export default function About() {
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
                                    <Heading>About us</Heading>
                                    <p>
                                        This is everything about us.
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
