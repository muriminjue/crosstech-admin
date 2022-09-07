import {
  Container,
  Stack,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import Page from "../components/Page";
import {
  Products,
  Stockings,
  Packagings,
  ProductGraph,
} from "../sections/inventory";

export default function Stock() {
  return (
    <Page title="Stock">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Inventory
        </Typography>
        <Stack
          direction="column"
          spacing={2}
          sx={{ my: 2 }}
        >
          <Card variant="outlined" sx={{ minWidth: "50%" }}>
            <CardContent>
              <Products />
            </CardContent>
          </Card>
          {/* <ProductGraph /> */}
        </Stack>

        <Accordion sx={{ my: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Packaging History
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Packagings />
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ my: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Purchase History
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stockings />
          </AccordionDetails>
        </Accordion>
      </Container>
    </Page>
  );
}
