'use client';

import useSWR from 'swr';
import { SWRKeys, fetcher } from '@/lib/swr';
import { Deal, DealStage } from '@/types';

const STAGE_COLORS: Record<DealStage, string> = {
  [DealStage.Lead]: '#6c757d',
  [DealStage.Proposal]: '#17a2b8',
  [DealStage.Negotiation]: '#ffc107',
  [DealStage.Won]: '#28a745',
  [DealStage.Lost]: '#dc3545',
};

export default function DealsPage() {
  const { data: deals } = useSWR<Deal[]>(SWRKeys.deals, fetcher.deals, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });

  const pipeline = {
    [DealStage.Lead]: deals?.filter(d => d.stage === DealStage.Lead) || [],
    [DealStage.Proposal]: deals?.filter(d => d.stage === DealStage.Proposal) || [],
    [DealStage.Negotiation]: deals?.filter(d => d.stage === DealStage.Negotiation) || [],
    [DealStage.Won]: deals?.filter(d => d.stage === DealStage.Won) || [],
    [DealStage.Lost]: deals?.filter(d => d.stage === DealStage.Lost) || [],
  };

  const totalByStage = (stage: DealStage) =>
    deals?.filter(d => d.stage === stage).reduce((sum, d) => sum + d.value, 0) || 0;

  return (
    <div className="container">
      <div className="page-header">
        <h2>Pipeline de Deals</h2>
      </div>

      <div className="pipeline">
        {Object.values(DealStage).map((stage) => (
          <div key={stage} className="pipeline-column">
            <h4 style={{ borderColor: STAGE_COLORS[stage] }}>
              {stage} <span style={{ fontSize: '14px', color: '#666' }}>${totalByStage(stage).toLocaleString()}</span>
            </h4>
            {pipeline[stage].map((deal) => (
              <div key={deal.id} className="pipeline-item">
                <h5>{deal.title}</h5>
                <div className="meta">
                  <div>{deal.currency} {deal.value.toLocaleString()}</div>
                </div>
              </div>
            ))}
            {(!pipeline[stage] || pipeline[stage].length === 0) && (
              <p style={{ color: '#999', fontSize: '14px', textAlign: 'center', padding: '20px' }}>Sin deals</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
