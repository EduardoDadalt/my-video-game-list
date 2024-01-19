import SignInProvider from "@/app/[locale]/auth/(loginAndRegister)/_components/signInProvider";
import { getDictionary } from "@/dictionaries/dictionaries";
import { FaDiscord, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export async function OAuthProviders({ locale: locale }: { locale: string }) {
  const dictionary = await getDictionary(locale);
  return (
    <div className="flex flex-col gap-2">
      <SignInProvider
        provider={"google"}
        name="Google"
        color="google"
        icon={<FcGoogle size={24} />}
        continueWith={dictionary.auth.oAuthProviders.continueWith}
      />
      <SignInProvider
        provider={"facebook"}
        name="Facebook"
        color="facebook"
        icon={<FaFacebookF size={24} />}
        continueWith={dictionary.auth.oAuthProviders.continueWith}
      />
      <SignInProvider
        provider={"discord"}
        name="Discord"
        color="discord"
        icon={<FaDiscord size={24} />}
        continueWith={dictionary.auth.oAuthProviders.continueWith}
      />
    </div>
  );
}
