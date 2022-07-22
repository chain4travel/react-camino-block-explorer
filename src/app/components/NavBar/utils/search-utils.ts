import {
  MagellanSearchResultElementType,
  MagellanXPTransactionSearchResult,
  MagellanCTransactionSearchResult,
  MagellanCBlockSearchResult,
  MagellanAddressSearchResult,
} from 'types/magellan-types';
import {
  getBlockDetailsPath,
  getAddressDetailsPath,
  getTransactionDetailsPath,
} from 'utils/route-utils';
import { ChainType } from 'utils/types/chain-type';
import { getChainID } from 'api/utils';

export async function mapToItem(
  type: MagellanSearchResultElementType,
  data:
    | MagellanXPTransactionSearchResult
    | MagellanCTransactionSearchResult
    | MagellanCBlockSearchResult
    | MagellanAddressSearchResult,
) {
  switch (type) {
    case MagellanSearchResultElementType.C_BLOCK:
      const cBlockData: MagellanCBlockSearchResult =
        data as MagellanCBlockSearchResult;
      return {
        label: cBlockData.hash,
        type: type,
        link: getBlockDetailsPath(ChainType.C_CHAIN, cBlockData.number),
        avatar: 'CB',
        avatarColor: 'primary',
      };
    case MagellanSearchResultElementType.C_ADDRESS:
      const cAddressData: MagellanCBlockSearchResult =
        data as MagellanCBlockSearchResult;
      return {
        label: cAddressData.hash,
        type: type,
        link: getAddressDetailsPath(ChainType.C_CHAIN, cAddressData.hash),
        avatar: 'AD',
        avatarColor: 'positive',
      };
    case MagellanSearchResultElementType.C_TRANSACTION:
      const cTransaction: MagellanCTransactionSearchResult =
        data as MagellanCTransactionSearchResult;
      return {
        label: cTransaction.hash,
        type: type,
        link: getTransactionDetailsPath(ChainType.C_CHAIN, cTransaction.hash),
        avatar: 'CT',
        avatarColor: 'info',
      };
    case MagellanSearchResultElementType.XP_TRANSACTION:
      const xpTransaction: MagellanXPTransactionSearchResult =
        data as MagellanXPTransactionSearchResult;
      let detailsLink = '';
      let avatar = '';
      let avatarColor = '';
      const actualChainId = xpTransaction.chainID;
      if (actualChainId === (await getChainID('p'))) {
        detailsLink = getTransactionDetailsPath(
          ChainType.P_CHAIN,
          xpTransaction.id,
        );
        avatar = 'PT';
        avatarColor = 'accent';
      } else {
        detailsLink = getTransactionDetailsPath(
          ChainType.X_CHAIN,
          xpTransaction.id,
        );
        avatar = 'XT';
        avatarColor = 'secondary';
      }
      return {
        label: xpTransaction.id,
        type: type,
        link: detailsLink,
        avatar: avatar,
        avatarColor: avatarColor,
      };
    default:
      console.log('Got unknown response type from search', +type);
      return undefined;
  }
}
