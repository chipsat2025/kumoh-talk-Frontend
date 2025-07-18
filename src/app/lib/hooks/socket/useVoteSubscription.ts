import { useEffect, useRef } from 'react';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '../../stores/socketStore';
import { END_POINTS } from '../../constants/common/path';
import { VoteResult } from '../../types/streaming/streaming';

export interface useVoteSubscriptionProps {
  streamId: string;
}

const useVoteSubscription = (props: useVoteSubscriptionProps) => {
  const { streamId } = props;
  const getCurrentVoteSubscribeRef = useRef<StompSubscription | null>(null);
  const voteCloseAndResultSubscribeRef = useRef<StompSubscription | null>(null);
  const createVoteSubscribeRef = useRef<StompSubscription | null>(null);
  const {
    stompClient,
    setVote,
    setIsVoteShow,
    setIsSelected,
    setIsVoteFinished,
    setVoteResult,
  } = useSocketStore();

  useEffect(() => {
    if (streamId && stompClient) {
      const getCurrentVoteSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.VOTE_CURRENT(
          stompClient.ws._transport.url.split('/')[5]
        ),
        (message) => {
          const body = JSON.parse(message.body);
          const voteInfo = body.voteInfoList[0];
          if (voteInfo) {
            setVote(voteInfo);
            setIsVoteShow(true);
            setIsVoteFinished(false);
            setIsSelected(false);
          }
        }
      );

      stompClient.send(
        END_POINTS.PUBLISH.VOTE_LIST_REQUEST(streamId),
        {},
        JSON.stringify({})
      );

      const voteCloseAndResultSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.VOTE_CLOSE_AND_RESULT(streamId),
        (message) => {
          const voteResult: VoteResult = {
            ...JSON.parse(message.body),
          };
          setVoteResult(voteResult);
          setIsVoteFinished(true);
        }
      );

      const createVoteSubscribe = stompClient.subscribe(
        END_POINTS.SUBSCRIBE.VOTE_CREATE(streamId),
        (message) => {
          setVote(JSON.parse(message.body));
          setIsVoteShow(true);
          setIsVoteFinished(false);
          setIsSelected(false);
        }
      );

      if (getCurrentVoteSubscribe)
        getCurrentVoteSubscribeRef.current = getCurrentVoteSubscribe;
      if (voteCloseAndResultSubscribe)
        voteCloseAndResultSubscribeRef.current = voteCloseAndResultSubscribe;
      if (createVoteSubscribe)
        createVoteSubscribeRef.current = createVoteSubscribe;
    }

    return () => {
      if (getCurrentVoteSubscribeRef.current) {
        getCurrentVoteSubscribeRef.current.unsubscribe();
        getCurrentVoteSubscribeRef.current = null;
      }

      if (voteCloseAndResultSubscribeRef.current) {
        voteCloseAndResultSubscribeRef.current.unsubscribe();
        voteCloseAndResultSubscribeRef.current = null;
      }

      if (createVoteSubscribeRef.current) {
        createVoteSubscribeRef.current.unsubscribe();
        createVoteSubscribeRef.current = null;
      }
    };
  }, [
    streamId,
    stompClient,
    setVote,
    setIsVoteShow,
    setIsSelected,
    setIsVoteFinished,
    setVoteResult,
  ]);
};

export default useVoteSubscription;
