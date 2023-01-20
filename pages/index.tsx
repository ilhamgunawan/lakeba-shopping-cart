import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page ? parseInt(context.query.page as string) : 1

  return {
    props: { page }
  }
}

export default function IndexPage() {
  return null
}
