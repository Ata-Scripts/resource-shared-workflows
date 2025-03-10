import os
import requests
from datasets import load_dataset

# Load the Coq-Changelog dataset
dataset = load_dataset('phanerozoic/Coq-Changelog', split='train')

# Process the dataset to create a changelog message
changelog_entries = []
for entry in dataset:
    version = entry['version']
    category = entry['category']
    change_type = entry['type']
    change_description = entry['change']
    changelog_entries.append(f"**Version {version}**\n- *{category}* ({change_type}): {change_description}")

changelog_message = "\n\n".join(changelog_entries)

# Send the changelog to the Discord webhook
webhook_url = os.getenv('DISCORD_WEBHOOK_URL')
if webhook_url:
    payload = {"content": changelog_message}
    headers = {"Content-Type": "application/json"}
    response = requests.post(webhook_url, json=payload, headers=headers)
    if response.status_code == 204:
        print("Changelog sent successfully.")
    else:
        print(f"Failed to send changelog. HTTP status code: {response.status_code}")
else:
    print("Discord webhook URL not found. Please set the DISCORD_WEBHOOK_URL environment variable.")
