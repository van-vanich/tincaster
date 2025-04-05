import { useFarcasterSigner, usePrivy } from "@privy-io/react-auth";
import { useFollowCreateMutation } from "~/hooks/fhub/useFollowCreateMutation";
import { Account } from "fhub";

export const useFollow = () => {
  const followCreatorMutation = useFollowCreateMutation();
  const farcasterSigner = useFarcasterSigner();
  const privy = usePrivy();

  const handleFollow = async (args: { fid: bigint }) => {
    const userFid = privy.user?.farcaster?.fid;
    if (!userFid) {
      return;
    }

    const account = Account.fromEd25519Signer({
      fid: BigInt(userFid),
      signer: {
        getSignerKey: farcasterSigner.getFarcasterSignerPublicKey,
        signMessageHash: farcasterSigner.signFarcasterMessage,
      },
    });
    return followCreatorMutation.mutate({
      follow: {
        targetFid: args.fid,
      },
      account,
    });
  };
  return {
    handleFollow,
    mutation: followCreatorMutation,
  };
};
