import hmac, hashlib

client_seed = "0c717d8f6258735e"
server_seed = "fe5eb891315539dfe315b22db784799ae618ee916d90336426453996d6117836"
nonce = 9
mines = 3

# Hitung hash
message = f"{client_seed}:{nonce}".encode()
key = server_seed.encode()
hash_result = hmac.new(key, message, hashlib.sha256).hexdigest()
print("Hash:", hash_result)  # Harus sama dengan hash di game

# Konversi hash ke posisi mines (contoh sederhana)
tiles = list(range(25))  # Grid 5x5
mines_positions = []
for i in range(mines):
    hex_part = hash_result[i*8 : (i+1)*8]
    rand_num = int(hex_part, 16)
    index = rand_num % len(tiles)
    mines_positions.append(tiles.pop(index))
print("Posisi Mines:", mines_positions)