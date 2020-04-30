import { substrate } from '../../substrate/server';
import { insertAccountFollower } from '../../postgres/insert-follower';
import { insertActivityForAccount } from '../../postgres/insert-activity';
import { insertNotificationForOwner } from '../../postgres/notifications';
import { SubstrateEvent, EventHandlerFn, HandlerResultOK } from '../../substrate/types';

export const onAccountFollowed: EventHandlerFn = async (eventAction: SubstrateEvent) => {
  const { data } = eventAction;
  await insertAccountFollower(data);
  const account = data[1].toString()
  const socialAccount = await substrate.findSocialAccount(account)
  if (!socialAccount) return HandlerResultOK;

  const count = socialAccount.followers_count.toNumber() - 1;
  const id = await insertActivityForAccount(eventAction, count);
  if (id === -1) return HandlerResultOK;

  const following = data[1].toString();
  await insertNotificationForOwner(id, following);
  return HandlerResultOK;
}
