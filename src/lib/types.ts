export interface Scenario {
  _id: string;
  title: string;
  category: string;
  story: string;
  tags: string[];
  shareCount: number;
  createdAt: Date;
  deletedAt?: Date;
}

export interface Share {
  _id: string;
  token: string;
  scenarioId: string;
  createdAt: Date;
  deletedAt?: Date;
}

export interface Answer {
  _id: string;
  shareId: string;
  name: string;
  perspective: string;
  public: boolean;
  createdAt: Date;
  deletedAt?: Date;
}

// API Response types
export interface ScenarioListItem {
  id: string;
  title: string;
  category: string;
  preview: string;
  tags: string[];
  shareCount: number;
}

export interface ScenarioDetail {
  id: string;
  title: string;
  category: string;
  fullText: string;
  tags: string[];
  shareCount: number;
}

export interface ShareResponse {
  shareUrl: string;
  token: string;
}

export interface ShareData {
  scenario: ScenarioDetail;
  answers: AnswerListItem[];
}

export interface AnswerListItem {
  id: string;
  name: string;
  perspective: string;
  createdAt: Date;
}

