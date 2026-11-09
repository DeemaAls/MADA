# MADA · مدى

A prototype for tracking joint range of motion (ROM) in children with Juvenile Idiopathic Arthritis (JIA), using a smartphone camera.

🔗 **Live demo:** https://madalv.netlify.app

## Features
- **Camera ROM measurement** – on-device pose and hand tracking (MediaPipe), with a measurement-quality score, side-view check, and Arabic voice guidance
- **21 instructional videos** – shoulder, elbow, wrist, hand, hip, knee and ankle movements
- **Physician portal** – flexible monitoring plans, automatic alerts, left vs. right comparison, and pediatric reference values (CDC)
- **Accuracy testing** – camera vs. goniometer, with MAE, ICC(2,1), Bland–Altman plot and CSV export
- **Real-time sync** – parent's phone to physician's laptop (Supabase Realtime)
- **Installable app (PWA)** – works offline, with medication and assessment reminders
- **Reports** – PDF report and FHIR R4 export

## Repository structure
- `site/` – production build, ready to deploy on Netlify
- `src/` – source template and build script

## References
- CDC Normal Joint Range of Motion Study (Soucie et al., 2011)
- Koo TK, Li MY. A Guideline of Selecting and Reporting Intraclass Correlation Coefficients. J Chiropr Med, 2016
