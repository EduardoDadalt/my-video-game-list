export default async function DeveloperPage({
  params: { developerId, locale },
}: {
  params: { developerId: string; locale: string };
}) {
  return (
    <div>
      {developerId}
      {locale}
    </div>
  );
}
