# Bartholomew Plumbing & Heating Co. - Landing Page

A highly interactive, conversion-oriented landing page for Bartholomew Plumbing & Heating Co. based in Columbus, OH.

## Project Details
- **Business Name**: Bartholomew Plumbing & Heating Co.
- **Location**: Columbus, OH
- **Phone**: (614) 253-8695
- **Features**:
  - Owner-direct communication
  - Established local expertise
  - Specialist in heating systems (tune-ups, boiler repairs, leaks)
  - Interactive estimate calculator
  - Interactive top bar toggle switching between "Customer View" and "Pitch View" (explaining the psychological and conversion mechanics behind each section of the site).

## Git & Deployment Instructions
To set up and deploy this project:
1. Initialize git: `git init`
2. Set configuration:
   ```bash
   git config user.email "a.jaffery@ignitetalentpartners.com"
   git config user.name "jaferysteps"
   ```
3. Add files and commit.
4. Create public repo and push:
   ```bash
   gh repo create bartholomew-plumbing-landing --public --source=. --push
   ```
5. Enable GitHub Pages:
   ```bash
   gh api repos/jafferysteps/bartholomew-plumbing-landing/pages -F "source[branch]=main" -F "source[path]=/"
   ```
