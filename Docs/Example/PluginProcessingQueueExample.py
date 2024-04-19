import time
from queue import Queue
import threading
from threading import Lock
from time import sleep

lock = Lock()
com = False
c = 0
listy = ['', 'O', 't', 'h', 'e', 'r', ' ', 't', 'h', 'a', 'n', ' ', 'a', 'd', 'd', 'i', 'n', 'g', ' ', 'a', ' ', 'b',
         'u', 'n', 'c', 'h', ' ', 'o', 'f', ' ', 'd', 'e', 'b', 'u', 'g', ' ', 'l', 'o', 'g', 'g', 'i', 'n', 'g', ' ',
         's', 'o', ' ', 'y', 'o', 'u', ' ', 'c', 'a', 'n', ' ', 's', 'e', 'e', ' ', 't', 'h', 'e', ' ', 'l', 'o', 'c',
         'k', 'i', 'n', 'g', ' ', 'm', 'o', 'r', 'e', ' ', 'c', 'l', 'e', 'a', 'r', 'l', 'y', ',', ' ', 't', 'h', 'e',
         ' ', 'b', 'i', 'g', ' ', 'c', 'h', 'a', 'n', 'g', 'e', ' ', 'h', 'e', 'r', 'e', ' ', 'i', 's', ' ', 't', 'o',
         ' ', 'a', 'd', 'd', ' ', 'a', ' ', 'm', 'e', 'm', 'b', 'e', 'r', ' ', 'c', 'a', 'l', 'l', 'e', 'd', ' ', '.',
         '_', 'l', 'o', 'c', 'k', ',', ' ', 'w', 'h', 'i', 'c', 'h', ' ', 'i', 's', ' ', 'a', ' ', 't', 'h', 'r', 'e',
         'a',
         'ding.', 'Lock()', ' object.', ' This', 'merci Nestor', ' .', '_lock', ' is', ' initialized', ' in', ' the',
         ' unlocked', 'state', ' and', ' locked', ' and', ' released', ' by', ' the', ' with', ' statement', '.', ]


def test(continue_plugin, data):
    while continue_plugin.queue[-1]:
        data1 = data.get()

        print(f"Data : {data1}")
        print("continue")
        if "merci Nestor" in data1:
            print("finished")
            continue_plugin.put(False)


continue_plugin = Queue()
data = Queue()
continue_plugin.put(True)
data.put("test")
print(f"Data: {data.queue} Continue {continue_plugin.queue}")
threading.Thread(target=test, args=(continue_plugin, data)).start()
while continue_plugin.queue[-1]:
    sleep(0.1)
    data.put(listy[c])
    c += 1
