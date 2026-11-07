---
layout: kit-info.njk
title: 'Kit Google connector privacy policy'
permalink: /kit/privacy/
description: 'How the idle-data Kit connector accesses, processes, and retains Google account data.'
blogcss: true
---

Effective October 23, 2026.

The idle-data Google connector is used by the Kit personal assistant to access the Google account authorized by its owner.

**Access and purpose.** Depending on the granted permissions and request, the connector can access account identity, Gmail messages and labels, and Google Calendar calendars and events. Granted permissions may also allow drafting or sending mail, changing message labels or state, and creating or updating events. Access is used to carry out the owner's assistant requests.

**Processing and sharing.** Tool results can enter the assistant's conversation and be processed by the AI services configured for that assistant. Replies sent through Telegram are processed by Telegram. This informational website does not receive Google API responses or OAuth tokens. The integration does not sell Google user data or use it for advertising. Its use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements. Google user data is not used by this integration to develop or train generalized AI models.

**Storage.** OAuth credentials are stored on the owner's computer so the connector can refresh access. Assistant conversation history, memory, and diagnostic logs may also retain information processed during requests. No automatic deletion period is promised. The owner controls the local configuration and stored files.

**Control and deletion.** The owner can stop the assistant, revoke the app's access in the Google Account connections settings, and remove locally stored credentials, conversations, memories, and logs. Revoking access prevents future authorized API access; it does not by itself erase previously retained local records or records held by configured service providers.

**Questions.** Contact the developer through the support email shown on the Google consent screen.

[Google Account connections](https://myaccount.google.com/connections) · [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
