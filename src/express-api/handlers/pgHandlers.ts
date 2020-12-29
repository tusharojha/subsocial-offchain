import * as express from 'express'
import { GetActivitiesFn, GetCountFn, GetCountsFn } from '../../postgres/queries/types';
import * as pgQueries from '../../postgres/queries';
import * as pgSessionKey from '../../postgres/inserts/insertSessionKey'
import * as pgNonce from '../../postgres/selects/getNonce'
import { SessionCall, AddSessionKeyArgs } from '../../postgres/types/sessionKey';
import {
  getOffsetFromRequest,
  getLimitFromRequest,
  resolvePromiseAndReturnJson,
  HandlerFn,
} from '../utils'

const activityHandler = (
  req: express.Request,
  res: express.Response,
  method: GetActivitiesFn
) => {
  const offset = getOffsetFromRequest(req)
  const limit = getLimitFromRequest(req)
  const account = req.params.id
  return resolvePromiseAndReturnJson(res, method({ account, offset, limit }))
}

const countHandler = async (
  req: express.Request,
  res: express.Response,
  method: GetCountFn | GetCountsFn
) => {
  const account = req.params.id
  return resolvePromiseAndReturnJson(res, method(account))
}

export const feedHandler: HandlerFn = (req, res) =>
  activityHandler(req, res, pgQueries.getFeedData)

export const feedCountHandler: HandlerFn = (req, res) =>
  countHandler(req, res, pgQueries.getFeedCount)

export const notificationsHandler: HandlerFn = (req, res) =>
  activityHandler(req, res, pgQueries.getNotificationsData)

export const notificationsCountHandler: HandlerFn = (req, res) =>
  countHandler(req, res, pgQueries.getNotificationsCount)

export const activitiesHandler: HandlerFn = (req, res) =>
  activityHandler(req, res, pgQueries.getActivitiesData)

export const activitiesCountHandler: HandlerFn = (req, res) =>
  countHandler(req, res, pgQueries.getActivitiesCount)

export const commentActivitiesHandler: HandlerFn = (req, res) =>
  activityHandler(req, res, pgQueries.getCommentActivitiesData)

export const commentActivitiesCountHandler: HandlerFn = (req, res) =>
  countHandler(req, res, pgQueries.getCommentActivitiesCount)

export const followActivitiesHandler: HandlerFn = (req, res) =>
  activityHandler(req, res, pgQueries.getFollowActivitiesData)

export const followActivitiesCountHandler: HandlerFn = (req, res) =>
  countHandler(req, res, pgQueries.getFollowActivitiesCount)

export const postActivitiesHandler: HandlerFn = (req, res) =>
  activityHandler(req, res, pgQueries.getPostActivitiesData)

export const postActivitiesCountHandler: HandlerFn = (req, res) =>
  countHandler(req, res, pgQueries.getPostActivitiesCount)

export const reactionActivitiesHandler: HandlerFn = (req, res) =>
  activityHandler(req, res, pgQueries.getReactionActivitiesData)

export const reactionActivitiesCountHandler: HandlerFn = (req, res) =>
  countHandler(req, res, pgQueries.getReactionActivitiesCount)

export const spaceActivitiesHandler: HandlerFn = (req, res) =>
  activityHandler(req, res, pgQueries.getSpaceActivitiesData)

export const spaceActivitiesCountHandler: HandlerFn = (req, res) =>
  countHandler(req, res, pgQueries.getSpaceActivitiesCount)

export const activityCountsHandler: HandlerFn = (req, res) =>
  countHandler(req, res, pgQueries.getActivityCounts)

export const addSessionKey: HandlerFn = (req, res) =>
  resolvePromiseAndReturnJson(res, pgSessionKey.addSessionKey(req.body.sessionCall as SessionCall<AddSessionKeyArgs>))

export const getNonce: HandlerFn = (req, res) => {
  const account = req.query.account as string
  return resolvePromiseAndReturnJson(res, pgNonce.getNonce(account))
}