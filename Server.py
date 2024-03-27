from whisper_live.client import TranscriptionClient

client_rapide = TranscriptionClient(
  "localhost",
  9090,
  lang="fr",
  translate=False,
  model="small",
  use_vad=False,
)

client_sure = TranscriptionClient(
  "localhost",
  9090,
  lang="en",
  translate=False,
  model="large",
  use_vad=False,
)