#custom hook used by opsworks chef deployment, we use it to run our own db migrations
#to utilize this hook, replace <app_short_name> with the correct value for the app

=begin
def execute(command)
  puts "execute: #{command}"
  `#{command}`.tap do |result|
    puts "result: #{result}"
  end
end

puts 'NODE MIGRATIONS: START'

app_short_name = '<app_short_name>'
command = "cd #{node[:deploy][app_short_name][:deploy_to]}/current && npm run db:migrate && npm run db:seed"
execute(command)

puts 'NODE MIGRATIONS: DONE'
=end