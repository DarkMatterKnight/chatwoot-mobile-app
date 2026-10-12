import React from 'react';

import { ListCard } from '@/components-next';
import i18n from '@/i18n';
import { Agent, ConversationPriority, Team } from '@/types';
import AssigneePanel from './AssigneePanel';
import TeamPanel from './TeamPanel';
import PriorityPanel from './PriorityPanel';

type ConversationSettingsPanelProps = {
  priority: ConversationPriority;
  team: Team | null;
  assignee: Agent | null;
  onChangeAssignee: () => void;
  onChangeTeamAssignee: () => void;
  onChangePriority: () => void;
};

export const ConversationSettingsPanel = ({
  assignee,
  team,
  priority,
  onChangeAssignee,
  onChangeTeamAssignee,
  onChangePriority,
}: ConversationSettingsPanelProps) => {
  return (
    <ListCard nightTitle={i18n.t('CONVERSATION.ASSIGNMENT')}>
      <AssigneePanel assignee={assignee} onPress={onChangeAssignee} />
      <TeamPanel team={team} onPress={onChangeTeamAssignee} />
      <PriorityPanel priority={priority} onPress={onChangePriority} />
    </ListCard>
  );
};
