import { Box, Typography } from "@material-ui/core";
import prisma from "../lib/database/prisma";

export default function ListEmails({ emails }: any) {
  return (
    <>
      <Box>
        {emails.map((email: any) => (
          <Typography key={email.id}>
            {email.id} - {email.email}
          </Typography>
        ))}
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const emails = await prisma.email.findMany({
    where: {
      isVerified: true,
    },
  });

  return {
    props: {
      emails: JSON.parse(JSON.stringify(emails)),
    },
    revalidate: 10,
  };
}
