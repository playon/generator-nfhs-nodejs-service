#custom hook used by opsworks chef deployment, we use it to run our own db migrations

def execute(command)
  puts "execute: #{command}"
  `#{command}`.tap do |result|
    puts "result: #{result}"
  end
end

puts 'NODE MIGRATIONS: START'

app_short_name = 'mint'
command = "cd #{node[:deploy][app_short_name][:deploy_to]}/current && npm run db:migrate && npm run db:seed"
execute(command)

puts 'NODE MIGRATIONS: DONE'
