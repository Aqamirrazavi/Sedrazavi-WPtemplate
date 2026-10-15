export type LayoutScenarioId = 'bento-hud' | 'dense-matrix' | 'hybrid-executive';

export type ActionDrawerMode = 'slide-over' | 'docked-media' | 'in-page';

export interface LayoutScenarioInfo {
  id: LayoutScenarioId;
  title: string;
  subtitle: string;
  description: string;
  themeAesthetic: string;
  badge: string;
  iconName: string;
}

export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  meta?: string;
}

export interface TrackItem {
  id: string;
  title: string;
  artistOrHost: string;
  duration: string;
  category: string;
  plays: string;
  coverUrl?: string;
}

export interface DenseDataRow {
  id: string;
  code: string;
  title: string;
  clientOrEntity: string;
  category: string;
  status: 'active' | 'in-review' | 'resolved' | 'pending';
  priority: 'high' | 'medium' | 'low';
  date: string;
  assignedTo: string;
  progress: number;
}
