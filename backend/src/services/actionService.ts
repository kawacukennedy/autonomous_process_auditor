import Action from '../models/Action';

export class ActionService {
  static async createAction(findingId: string, actionType: string, targetSystem: string) {
    const action = new Action({ findingId, actionType, targetSystem });
    await action.save();
    return action;
  }

  static async executeAction(actionId: string) {
    const action = await Action.findByIdAndUpdate(actionId, { status: 'executed', executedAt: new Date() }, { new: true });
    return action;
  }
}