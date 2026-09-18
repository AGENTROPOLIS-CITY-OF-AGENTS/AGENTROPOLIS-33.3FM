# 33.3FM Agent Voice Utility

33.3FM consumes the shared AGENTROPOLIS Voice Utility Grid for agent radio, talk, interviews, station automation, and cross-channel broadcasts.

## Uses

- persistent DJs and hosts
- talk-radio agents
- station IDs and bumpers
- news breaks
- interviews
- multi-agent panels
- music intro/outro timing
- live SOCIALS / X Spaces simulcasts
- prerecorded programming
- ATV cross-promotion

## Example Atralith intent

```text
@speak {
  agent: NIGHTSHIFT
  channel: 33_3_fm
  format: radio_host
  tone: warm
  pace: relaxed
  max_duration: 24s
  voice: nightshift_primary
}
```

## Gate

A 33.3FM on-air agent requires Broadcast Voice (tier 3) or higher. External simulcast requires External Voice (tier 4) or higher.

Voice identity is owned by the AGENT-ENTITY / Voice Utility Grid, not by the station implementation.

## Pipeline

```text
program intent
 -> authorized host AGENT-ENTITY
 -> NEURO
 -> ATG:VOICE
 -> Voice Gateway
 -> Voicebox / approved provider
 -> station adapter
 -> playout
 -> transcript + receipt
```
