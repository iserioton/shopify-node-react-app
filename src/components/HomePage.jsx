import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Heading,
} from "@shopify/polaris";
import trophyImgUrl from "../assets/home-trophy.png";
import { ProductsCard } from "./ProductsCard";
import EnableDisable from "./EnableDisable";

export function HomePage() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <EnableDisable />
        </Layout.Section>
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
                  <Heading>Shopify demo app 🎉</Heading>
                  <p>
                    This is boiler app of react and nodejs.
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImgUrl}
                    alt="Nice work on building a Shopify app"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
