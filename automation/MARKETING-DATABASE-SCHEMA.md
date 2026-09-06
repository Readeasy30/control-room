# Marketing Database Schema

## content_items

- id
- brand
- title
- topic_cluster
- audience
- skill
- content_type
- status
- target_keyword
- url
- created_date
- updated_date

## campaigns

- id
- name
- brand
- goal
- start_date
- end_date
- status

## distribution_assets

- id
- content_id
- platform
- asset_type
- status
- published_date

## analytics

- content_id
- impressions
- clicks
- engagement
- conversions
- review_date

## Principle

Single source of truth for marketing operations.
