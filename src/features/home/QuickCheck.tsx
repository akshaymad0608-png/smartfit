import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { bmi, bmiCategory, bmiCategoryAsian } from '@/features/calculators/formulas';

/**
 * Instant BMI check on the home page: two numbers in, a result out, no
 * navigation. Shows the international and the Indian / Asian category side by
 * side, then hands off to the full calculators for everything else.
 */
export function QuickCheck() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(68);
  const valid = height >= 100 && height <= 250 && weight >= 25 && weight <= 300;
  const value = valid ? bmi(weight, height) : 0;
  const intl = bmiCategory(value);
  const asian = bmiCategoryAsian(value);

  return (
    <Card className="mx-auto max-w-3xl p-6 md:p-8">
      <div className="grid items-center gap-6 md:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-card-title font-bold text-heading">Quick BMI check</h2>
          <p className="mt-1 text-sm text-muted">
            Two numbers, instant result — with the Indian and Asian cut-offs as well.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Input
              label="Height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value) || 0)}
              suffix="cm"
            />
            <Input
              label="Weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value) || 0)}
              suffix="kg"
            />
          </div>
        </div>
        <div className="rounded-2xl bg-surface-muted p-5" aria-live="polite">
          {valid ? (
            <>
              <p className="text-sm font-semibold text-muted">Your BMI</p>
              <p className="text-hero font-extrabold text-gradient">{value}</p>
              <div className="mt-3 space-y-2 text-sm text-body">
                <p className="flex items-center justify-between gap-3">
                  <span>International</span>
                  <Badge tone={intl.tone}>{intl.label}</Badge>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span>Indian / Asian</span>
                  <Badge tone={asian.tone}>{asian.label}</Badge>
                </p>
              </div>
              <Link
                to="/calculators"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Get your calories, protein and body fat <ArrowRight size={14} />
              </Link>
            </>
          ) : (
            <p className="text-sm text-muted">
              Enter a height between 100 and 250 cm and a weight between 25 and 300 kg.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
