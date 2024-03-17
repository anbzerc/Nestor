from faster_whisper import WhisperModel
import time

def main():
    time_savec= time.time()
    model_size = "small"
    print(model_size)
    model = WhisperModel(model_size, device="cuda", compute_type="int8")
    segments, info = model.transcribe("test.mp3", beam_size=5)

    print("Detected language '%s' with probability %f" % (info.language, info.language_probability))

    for segment in segments:
        #print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
        print(segment.text)
    print(time_savec - time.time())
if __name__ == "__main__":
    main()


def is_called(segment: str):
    if "nestor" in segment:
        segment.index("nestor")
